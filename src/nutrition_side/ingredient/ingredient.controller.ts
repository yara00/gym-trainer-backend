import { Controller, Get, Res, Param, BadRequestException, Query, UseGuards, Post, Delete } from '@nestjs/common';
import { IngredientInfoDto } from 'src/nutrition_side/ingredient/dtos/ingredient.dto';
import { IngredientService } from './ingredient.service';
import axios from 'axios';
import { Response } from 'express';
import { CLOUDINARY_INGREDIENTS_FOLDER_NAME } from 'src/constants';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
import { v2 } from 'cloudinary';
import { Readable } from 'typeorm/platform/PlatformTools';
import { IngredientInfoDTO } from './dtos/ingredient-info.dto';
import { IngredientDetailsDTO } from './dtos/ingredient-details.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { Ingredient } from 'src/entity/ingredients.entity';


@Controller('ingredient')
export class IngredientController { 
  cloudinary;
  ninja_api_url;
  ninja_api_key;
  spoonacular_api_url;
  spoonacular_api_key;

  constructor(private readonly ingredientService: IngredientService) {
    this.cloudinary = new CloudinaryService();
    this.ninja_api_url = process.env.NINJA_API_URL;
    this.ninja_api_key = process.env.NINJA_API_KEY;
    this.spoonacular_api_url = process.env.SPOONACULAR_API_URL;
    this.spoonacular_api_key = process.env.SPOONACULAR_API_KEY;
    
  }

  // Call the function with the path to your CSV file
  @Get('read-ingredients')
  async readIngredients(): Promise<IngredientInfoDto[]> {
    const filePath = 'src/top-1k-ingredients.csv';
    const ingredients = await this.ingredientService.processIngredientsFile(filePath);
    return ingredients;
}
    @Get('get_ingredient_info/:name')
    async getIngredientHealtyDetails(@Param('name') name: string): Promise<IngredientInfoDTO> {

        try {
            const response = await axios.get(`${this.ninja_api_url}${name}`, {
                headers: {
                    'X-Api-Key': this.ninja_api_key,
                },
            });
            const data = response.data[0] as IngredientInfoDTO;
            return data;
        } catch (error) {
            if (error.response) {
                console.error(`Error: ${error.response.status} ${error.response.data}`);
                throw new Error(`Error: ${error.response.status} ${error.response.data}`);
            } else if (error.request) {
                console.error(`Error: No response received from the server`);
                throw new Error('Error: No response received from the server');
            } else {
                console.error(`Error: ${error.message}`);
                throw new Error(`Error: ${error.message}`);
            }
        }
    }


    @Get('get_ingredient_details_by_id/:id') // Adjusted route definition to include the 'id' parameter
    async getIngredientDetails(@Param('id') id: string): Promise<IngredientDetailsDTO> {
        try {
            const response = await axios.get(`${this.spoonacular_api_url}${id}/information?amount=1`, {
                headers: {
                    'X-Api-Key': this.spoonacular_api_key,
                    
                },
            });
            const data = response.data as IngredientDetailsDTO;
            data.nutrition= response.data.nutrition.nutrients;

            return data;
        } catch (error) {
            if (error.response) {
                console.error(`Error: ${error.response.status} ${error.response.data}`);
                throw new Error(`Error: ${error.response.status} ${error.response.data}`);
            } else if (error.request) {
                console.error(`Error: No response received from the server`);
                throw new Error('Error: No response received from the server');
            } else {
                console.error(`Error: ${error.message}`);
                throw new Error(`Error: ${error.message}`);
            }
        }
    }

    @Get('get_image/:imageName')
    async getImage(@Param('imageName') imageName: string, @Res() res: Response): Promise<void> {
        try {
            const imageResponse = await axios.get(`https://img.spoonacular.com/ingredients_500x500/${imageName}`, {
                responseType: 'stream', // Set response type to stream to directly pipe it to response
                headers: {
                    'x-api-key': this.spoonacular_api_key,
                },
            });

            const link = await this.uploadIngredientImageToCloudinary(imageResponse.data);
        
            // Set response type to JSON and send the link
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ imageUrl: link });
            // return Buffer.from(imageResponse.data, 'binary');
        } catch (error) {
            console.error('Error fetching image:', error);
            // Return an error response if something goes wrong
            res.status(500).send('Internal server error');
        }
    }


    
    async uploadIngredientImageToCloudinary(imageStream: Readable): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const uploadStream = v2.uploader.upload_stream(
                {
                    folder: CLOUDINARY_INGREDIENTS_FOLDER_NAME,
                },
                (error, result) => {
                    if (error) {
                        reject(new Error('Image upload failed'));
                    } else {
                        resolve(result.secure_url);
                    }
                }
            );
    
            imageStream.pipe(uploadStream);
        });
    }
    
    

   @Get('get_all_ingredient_data')
    async getAll(@Query('ingredient') ingredient: string,@Res() res: Response): Promise<void> {
        try {
            const ingredientInfoDTO: IngredientInfoDto = JSON.parse(ingredient);
            const data = await this.ingredientService.getAllAndSave(ingredientInfoDTO);
            console.log("DATA", data)
            res.status(200).send(data);
          } catch (error) {
            throw new Error("Error");
          }
    }
    @UseGuards(JwtAuthGuard)
    @Post('save/:id')
    async saveIngredient(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<{ message: string }> {
        console.log('saveIngredient');
        await this.ingredientService.saveIngredient(id, user);
        return { message: 'Ingredient saved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Delete('unsave/:id')
    async unsaveIngredient(
        @Param('id') id: number,
        @GetUser() user: User,
    ): Promise<{ message: string }> {
        console.log('unsaveIngredient');
        await this.ingredientService.unSaveIngredient(id, user);
        return { message: 'Ingredient unsaved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-saved')
    async getAllSaved(@GetUser() user: User):Promise<Ingredient[]>{
        return this.ingredientService.getAllSaved(user)
    }


    
}
