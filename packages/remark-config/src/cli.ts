#!/usr/bin/env node
import { buildCommands } from '../../../src/command-builder-new.js'
import { commandDefinition } from './command.js'

await buildCommands(commandDefinition)
