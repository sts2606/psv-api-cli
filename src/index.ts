#!/usr/bin/env node

import { createEntityRoutes } from './services/create-entity-routes';

createEntityRoutes(process.argv[2]);
