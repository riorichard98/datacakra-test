import { convertFromDirectory } from 'joi-to-typescript';

convertFromDirectory({
  schemaDirectory: './src/joi/schema/',
  typeOutputDirectory: './src/joi/interface/',
  debug: true
});
