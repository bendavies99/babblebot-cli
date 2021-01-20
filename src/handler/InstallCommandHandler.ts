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
import CommandHandler from "./CommandHandler";
import { directoryExists } from "../util/path";
import chalk from "chalk";
import { GithubClient } from "src/util/github";

/**
 * Properties Interface that describes what will be passed to the handle method
 *
 * @author Ben Davies <me@bdavies.net>
 * @since 1.0.0
 */
export interface InstallProps {
    readonly outputDir: string;
    readonly dryrun: boolean;
}

/**
 * Class is for handling commands
 *
 * @author Ben Davies <me@bdavies.net>
 * @since 1.0.0
 */
export default class InstallCommandHandler
    implements CommandHandler<InstallProps> {
    /**
     * Construct a Install Command Handler
     *
     * @param {GithubClient} ghClient The Github Client dependancy
     */
    constructor(private ghClient: GithubClient) {}

    /**
     * Handle the command
     *
     * @param {InstallProps} _props props for current command context
     * @returns {Promise<boolean>} true if no errors occurred
     */
    public async handle(_props: InstallProps): Promise<boolean> {
        if (
            directoryExists(_props.outputDir + "/lib") &&
            directoryExists(_props.outputDir + "/bin")
        ) {
            console.log(
                chalk.red.bold("Error: Babblebot already installed here"),
            );
            return false;
        }
        const releases = await this.ghClient.getReleases();
        console.log(releases);
        return true;
    }
}
