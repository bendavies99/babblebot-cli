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

import yargs from "yargs";
import CommandHandler from "../../src/handler/CommandHandler";
import { InstallProps } from "../../src/handler/InstallCommandHandler";

describe("Install Command", () => {
    it("should display --output when running help on install", async () => {
        const installModule = await import("../../src/commands/install");
        const handleImpl: CommandHandler<InstallProps> = {
            handle: jest.fn(),
        };
        const parser = yargs.command(installModule.default(handleImpl)).help();
        const output = await new Promise((resolve) =>
            parser.parse(
                "install --help",
                (_err: any, _argv: any, output: string) => resolve(output),
            ),
        );
        expect(output).toContain("--output");
    });
    it("should call handler function when running command", async () => {
        const handler = jest.fn();
        const installModule = await import("../../src/commands/install");
        const module = installModule.default({ handle: jest.fn() });
        module.handler = handler;
        const parser = yargs.command(module).help();
        await parser.parse("install");
        expect(handler).toHaveBeenCalled();
    });
    it("should fun mock with custom directory", async () => {
        const handler = jest.fn();
        const installModule = await import("../../src/commands/install");
        const module = installModule.default({ handle: jest.fn() });
        module.handler = handler;
        const parser = yargs.command(module).help();
        await parser.parse("install --output=" + "babblebot");
        expect(handler).toHaveBeenCalledWith(
            expect.objectContaining({ output: "babblebot" }),
        );
    });
    it("should run handle method on handler supplied", async () => {
        const installModule = await import("../../src/commands/install");
        console.log = jest.fn();
        const handleImpl: CommandHandler<InstallProps> = {
            handle: jest.fn().mockReturnValue(true),
        };
        const module = installModule.default(handleImpl);
        const parser = yargs.command(module).help();
        await parser.parse("install");
        expect(handleImpl.handle).toHaveBeenCalledWith({ outputDir: ".", dryrun: false });
        expect(console.log).toHaveBeenCalledWith("Completed!");
    });
    it("should log an error if the handle went wrong", async () => {
        const installModule = await import("../../src/commands/install");
        console.log = jest.fn();
        const handleImpl: CommandHandler<InstallProps> = {
            handle: jest.fn().mockReturnValue(false),
        };
        const module = installModule.default(handleImpl);
        const parser = yargs.command(module).help();
        await parser.parse("install --dryrun");
        expect(handleImpl.handle).toHaveBeenCalledWith({ outputDir: ".", dryrun: true });
        expect(console.log).toHaveBeenCalledWith("There has been an error");
    });
});
