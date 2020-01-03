import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Body
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";
import { UploadService } from "./upload.service";
import * as fs from "fs-extra";
import { join } from "path";

@Controller("upload")
export class UploadController {
  rootPath = join(__dirname, "../../../upload");
  constructor(public readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files, @Body() body): Promise<any[]> {
    let filenames = [];
    for (const file of files) {
      let filename = `${Date.now()}-${file.originalname}`;
      await fs.writeFileSync(
        join(this.rootPath, filename),
        file.buffer,
        "utf8"
      );
      filenames = [...filenames, filename];
    }
    return filenames;
  }
}
