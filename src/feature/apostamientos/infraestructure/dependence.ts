import { MySQLApostamientoRepositoryImpl } from "../infraestructure/db/MySQLApostamientoRepositoryImpl";

import { CreateApostamientoUseCase } from "../application/usecases/createApostamiento_usecase";
import { GetAllApostamientosUseCase } from "../application/usecases/getAllApostamientos_usecase";
import { GetApostamientoByUuidUseCase } from "../application/usecases/getApostamientoByUuid_usecase";
import { GetApostamientosByClientUseCase } from "../application/usecases/getApostamientosByClient_usecase";

import { CreateApostamientoController } from "../infraestructure/controllers/createApostamiento_controller";
import { GetAllApostamientosController } from "../infraestructure/controllers/getAllApostamientos_controller";
import { GetApostamientoByUuidController } from "../infraestructure/controllers/getApostamientoByUuid_controller";
import { GetApostamientosByClientController } from "../infraestructure/controllers/getApostamientosByClient_controller";

const repo = new MySQLApostamientoRepositoryImpl();

const createApostamientoUseCase = new CreateApostamientoUseCase(repo);
export const createApostamientoController =
  new CreateApostamientoController(createApostamientoUseCase);

const getAllUseCase = new GetAllApostamientosUseCase(repo);
export const getAllApostamientosController =
  new GetAllApostamientosController(getAllUseCase);

const getByUuidUseCase = new GetApostamientoByUuidUseCase(repo);
export const getApostamientoByUuidController =
  new GetApostamientoByUuidController(getByUuidUseCase);

const getByClientUseCase = new GetApostamientosByClientUseCase(repo);
export const getApostamientosByClientController =
  new GetApostamientosByClientController(getByClientUseCase);
