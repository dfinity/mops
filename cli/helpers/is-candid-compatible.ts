import chalk from "chalk";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { is_candid_compatible } from "../wasm.js";

export interface IsCandidCompatibleResult {
  compatible: boolean;
  newPath: string;
  originalPath: string;
  error?: string;
}

export interface IsCandidCompatibleOptions {
  verbose?: boolean;
}

/**
 * Check if two Candid files are compatible
 * @param newPath Path to the new/generated Candid file
 * @param originalPath Path to the original Candid file
 * @param options Options for the compatibility check
 * @returns Result object with compatibility status and file paths
 */
export async function isCandidCompatible(
  newPath: string,
  originalPath: string,
  options: Partial<IsCandidCompatibleOptions> = {},
): Promise<IsCandidCompatibleResult> {
  const { verbose = false } = options;

  const resolvedNewCandidPath = path.resolve(newPath);
  const resolvedOriginalCandidPath = path.resolve(originalPath);

  const result: IsCandidCompatibleResult = {
    compatible: false,
    newPath: resolvedNewCandidPath,
    originalPath: resolvedOriginalCandidPath,
  };

  try {
    if (!existsSync(newPath)) {
      result.error = `New Candid file not found: ${newPath}`;
      return result;
    }
    if (!existsSync(originalPath)) {
      result.error = `Original Candid file not found: ${originalPath}`;
      return result;
    }

    verbose && console.time("candid-compatibility-check");

    const newText = readFileSync(resolvedNewCandidPath, "utf8");
    const originalText = readFileSync(resolvedOriginalCandidPath, "utf8");

    if (verbose) {
      console.log(
        chalk.gray(
          `Comparing Candid interfaces using Wasm compatibility checker`,
        ),
      );
    }

    result.compatible = is_candid_compatible(newText, originalText);

    verbose && console.timeEnd("candid-compatibility-check");

    return result;
  } catch (error: any) {
    result.error =
      error.message || "Unknown error during Candid compatibility check";
    return result;
  }
}
