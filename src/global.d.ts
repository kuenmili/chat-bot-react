// global.d.ts
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
// global.d.ts o arriba del archivo
declare module "react-to-webcomponent";
