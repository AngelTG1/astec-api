import { MySQLActivityRepositoryImpl } from "./db/MySQLActivityRepositoryImpl";

import { CreateActivityUseCase } from "../application/usecases/createActivity_usecase";
import { GetAllActivitiesUseCase } from "../application/usecases/getAllActivities_usecase";
import { GetActivityByUuidUseCase } from "../application/usecases/getActivityByUuid_usecase";
import { GetActivitiesByClientUseCase } from "../application/usecases/getActivitiesByClient_usecase";
import { GetActivitiesByEmpleadoUseCase } from "../application/usecases/getActivitiesByEmpleado_usecase";
import { GetEmployeesByClientUseCase } from "../application/usecases/getEmployeesByClient_usecase";
import { GetClientsWithAttendanceUseCase } from "../application/usecases/getClientsWithAttendance_usecase";

import { CreateActivityController } from "./controllers/createActivity_controller";
import { GetAllActivitiesController } from "./controllers/getAllActivities_controller";
import { GetActivityByUuidController } from "./controllers/getActivityByUuid_controller";
import { GetActivitiesByClientController } from "./controllers/getActivitiesByClient_controller";
import { GetActivitiesByEmpleadoController } from "./controllers/getActivitiesByEmpleado_controller";
import { GetEmployeesByClientController } from "./controllers/getEmployeesByClient_controller";
import { GetClientsWithAttendanceController } from "./controllers/getClientsWithAttendance_controller";

const repo = new MySQLActivityRepositoryImpl();

export const createActivityController =
  new CreateActivityController(new CreateActivityUseCase(repo));

export const getAllActivitiesController =
  new GetAllActivitiesController(new GetAllActivitiesUseCase(repo));

export const getActivityByUuidController =
  new GetActivityByUuidController(new GetActivityByUuidUseCase(repo));

export const getActivitiesByClientController =
  new GetActivitiesByClientController(new GetActivitiesByClientUseCase(repo));

export const getActivitiesByEmpleadoController =
  new GetActivitiesByEmpleadoController(new GetActivitiesByEmpleadoUseCase(repo));

export const getEmployeesByClientController =
  new GetEmployeesByClientController(new GetEmployeesByClientUseCase(repo));

export const getClientsWithAttendanceController =
  new GetClientsWithAttendanceController(new GetClientsWithAttendanceUseCase(repo));
