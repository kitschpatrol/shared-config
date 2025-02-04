#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder.js'
import { commandDefinition } from './command.js'

await buildCommands(commandDefinition)
