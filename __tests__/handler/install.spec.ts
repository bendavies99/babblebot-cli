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

import InstallCommandHandler from "../../src/handler/InstallCommandHandler";

describe("Install Command Handler", () => {
    it("should error to the user if babblebot is already installed the directory and return false", async () => {
        console.log = jest.fn();
        const path = process.cwd() + "/__tests__/testDir/with";
        const handler = new InstallCommandHandler({ getReleases: async () => { return []; } });
        const result = await handler.handle({ outputDir: path, dryrun: true });
        expect(console.log).toHaveBeenCalledWith(
            expect.stringContaining("Error: Babblebot already installed here"),
        );
        expect(result).toBe(false);
    });
    it("should return true for the handler with no console errors", async () => {
        console.log = jest.fn();
        const path = process.cwd() + "/__tests__/testDir";
        const mock = jest.fn().mockReturnValue([null, "Test"]);
        const handler = new InstallCommandHandler({ getReleases: mock });
        const result = await handler.handle({ outputDir: path, dryrun: true });
        expect(console.log).not.toHaveBeenCalledWith(
            expect.stringContaining("Error: Babblebot already installed here"),
        );
        expect(result).toBe(true);
        expect(mock).toHaveReturnedWith([null, "Test"]);
    });
});
