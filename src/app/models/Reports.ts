export interface ReportsModel{
    id : number;
    descripcion : string;
    numeroPerros : number;
    direccion : string;
    idUsuario : number;
    foto : string;
    status : string;
    idUsuarioAtendio?: number;
    fecha?: string;
}