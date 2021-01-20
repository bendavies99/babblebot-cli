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
 *
 */

import { CommandModule } from "yargs";
import CommandHandler from "../handler/CommandHandler";
import { InstallProps } from "../handler/InstallCommandHandler";

/**
 * Command Args Interface
 */
interface InstallCommandArgs {
    readonly output: string;
    readonly dryrun: boolean;
}

/**
 * Command Definition for the Install Command
 *
 * @param {CommandHandler<InstallProps>} handler The handler the InstallCommand will run when the command is called
 * @returns {CommandModule<any, { output: string }>} the command module for yargs
 * @author Ben Davies <me@bdavies.net>
 * @since 1.0.0
 */
export default (
    handler: CommandHandler<InstallProps>,
): CommandModule<any, InstallCommandArgs> => ({
    /**
     * The command definition
     */
    command: "install [dryrun] [output]",
    /**
     * Argument Builder
     */
    builder: {
        output: {
            default: ".",
            type: "string",
            describe: "The directory to install babblebot to",
            demandOption: true,
        },
        dryrun: {
            default: false,
            type: "boolean",
            boolean: true,
            describe:
                "Run the install command without affecting any of the filesystems",
        },
    },
    /**
     * Command Handler
     *
     * @param {InstallCommandArgs} args arguments from the parsed command
     * @returns {void}
     */
    handler: async (args: InstallCommandArgs): Promise<void> => {
        const result = await handler.handle({
            outputDir: args.output,
            dryrun: args.dryrun,
        });
        if (result) {
            console.log("Completed!");
        } else {
            console.log("There has been an error");
        }
    },
});
