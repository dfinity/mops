import chalk from "chalk";
import { isCandidCompatible } from "../helpers/is-candid-compatible.js";

export interface CheckCandidOptions {
  verbose?: boolean;
}

export async function checkCandid(
  newPath: string,
  originalPath: string,
  options: Partial<CheckCandidOptions> = {},
): Promise<void> {
  const { verbose = false } = options;

  console.log(chalk.blue("Checking Candid compatibility"));
  console.log(chalk.gray(`New Candid file: ${newPath}`));
  console.log(chalk.gray(`Original Candid file: ${originalPath}`));

  const result = await isCandidCompatible(newPath, originalPath, {
    verbose,
  });

  if (result.error) {
    console.error(chalk.red("Error while checking Candid compatibility"));
    console.error(chalk.red(`Details: ${result.error}`));
    throw new Error("Candid compatibility check execution failed");
  }

  if (!result.compatible) {
    console.error(chalk.red("✖ Candid compatibility check failed"));
    process.exit(1);
  }

  console.log(chalk.green("✓ Candid compatibility check passed"));
}
