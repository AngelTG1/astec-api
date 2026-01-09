import { MySQLEmployeeRepositoryImpl } from "./db/MySQLEmployeeRepositoryImpl";

import { GetEmployeeByUuidUseCase } from "../application/usecases/getEmployeeByUuid_usecase";
import { GetEmployeeByUuidController } from "./controllers/getEmployeeByUuid_controller";

import { GetAllEmployeesUseCase } from "../application/usecases/getAllEmployees_usecase";
import { GetAllEmployeesController } from "./controllers/getAllEmployees_controller";

import { CreateEmployeeUseCase } from "../application/usecases/createEmployee_usecase";
import { CreateEmployeeController } from "./controllers/createEmployee_controller";
import { UpdateEmployeeUseCase } from "../application/usecases/updateEmployee_usecase";
import { UpdateEmployeeController } from "./controllers/updateEmployee_controller";

// 🟦 INSTANCIA DEL REPOSITORIO (ESTO FALTABA)
const mysqlEmployeeRepository = new MySQLEmployeeRepositoryImpl();

// 🟦 Crear
const createEmployeeUseCase = new CreateEmployeeUseCase(mysqlEmployeeRepository);
export const createEmployeeController =
  new CreateEmployeeController(createEmployeeUseCase);

// 🟦 Obtener por UUID
const getEmployeeByUuidUseCase = new GetEmployeeByUuidUseCase(mysqlEmployeeRepository);
export const getEmployeeByUuidController =
  new GetEmployeeByUuidController(getEmployeeByUuidUseCase);

// 🟦 Obtener todos
const getAllEmployeesUseCase = new GetAllEmployeesUseCase(mysqlEmployeeRepository);
export const getAllEmployeesController =
  new GetAllEmployeesController(getAllEmployeesUseCase);

// 🟦 Actualizar
const updateEmployeeUseCase = new UpdateEmployeeUseCase(mysqlEmployeeRepository);
export const updateEmployeeController =
  new UpdateEmployeeController(updateEmployeeUseCase);
