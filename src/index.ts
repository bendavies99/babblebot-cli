#!/usr/bin/env node
/* istanbul ignore file */
/*
 * MIT License
 *
 * Copyright (c) 2021 Ben Davies
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Octokit } from "@octokit/rest";
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import yargs from "yargs";
import installCommand from "./commands/install";
import InstallCommandHandler from "./handler/InstallCommandHandler";
import GithubClientImpl from "./util/github";

/**
 * @file Index file for this library
 * @author Ben Davies <me@bdavies.net>
 * @since 1.0.0
 */

// Clear the console to start the cli
clear({ fullClear: true });

// Display The Babblebot CLI Logo
console.log(
    chalk.blueBright(
        figlet.textSync("Babblebot CLI", { horizontalLayout: "full" }),
    ),
);

// Setup yargs for command processing
yargs
    .scriptName("babblebot-cli")
    .usage("$0 <cmd> [args]")
    .demandCommand()
    .command(
        installCommand(
            new InstallCommandHandler(new GithubClientImpl(new Octokit())),
        ),
    )
    .help().argv;
