import { execaCommand } from "@manhtri/node-util";

interface RunOptions {
  command?: string;
}
export async function run (options: RunOptions) {
  const { command } = options;
  if (!command) {
    console.error('Please enter the command to run');
    process.exit(1);
  }

  console.log(command);
  //execaCommand(`pnpm --filter`)
}