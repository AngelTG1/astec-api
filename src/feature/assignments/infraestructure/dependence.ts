import { MySQLAssignmentRepositoryImpl } from "../infraestructure/db/MySQLAssignmentRepositoryImpl";

import { CreateAssignmentUseCase } from "../application/usecases/createAssignment_usecase";
import { GetAllAssignmentsUseCase } from "../application/usecases/getAllAssignments_usecase";
import { GetAssignmentByUuidUseCase } from "../application/usecases/getAssignmentByUuid_usecase";
import { GetAssignmentsByApostamientoUseCase } from "../application/usecases/getAssignmentsByApostamiento_usecase";
import { GetAssignmentsByEmpleadoUseCase } from "../application/usecases/getAssignmentsByEmpleado_usecase";

import { CreateAssignmentController } from "../infraestructure/controllers/createAssignment_controller";
import { GetAllAssignmentsController } from "../infraestructure/controllers/getAllAssignments_controller";
import { GetAssignmentByUuidController } from "../infraestructure/controllers/getAssignmentByUuid_controller";
import { GetAssignmentsByApostamientoController } from "../infraestructure/controllers/getAssignmentsByApostamiento_controller";
import { GetAssignmentsByEmpleadoController } from "../infraestructure/controllers/getAssignmentsByEmpleado_controller";

const repo = new MySQLAssignmentRepositoryImpl();

export const createAssignmentController =
  new CreateAssignmentController(new CreateAssignmentUseCase(repo));

export const getAllAssignmentsController =
  new GetAllAssignmentsController(new GetAllAssignmentsUseCase(repo));

export const getAssignmentByUuidController =
  new GetAssignmentByUuidController(new GetAssignmentByUuidUseCase(repo));

export const getAssignmentsByApostamientoController =
  new GetAssignmentsByApostamientoController(
    new GetAssignmentsByApostamientoUseCase(repo)
  );

export const getAssignmentsByEmpleadoController =
  new GetAssignmentsByEmpleadoController(
    new GetAssignmentsByEmpleadoUseCase(repo)
  );
