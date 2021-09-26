const formateChalk = require("chalk");
const wrapAnsi = require("wrap-ansi");
const boxen = require("boxen");

interface BoxenOption {
  borderColor?: string;
  borderStyle?: string;
  padding?: number;
  margin?: number;
}

function maxCharsPerLine() {
  return ((process.stdout.columns || 100) * 80) / 100;
}

function indent(count: number, chr = " ") {
  return chr.repeat(count);
}

function indentLines(string: string, spaces: number, firstLineSpaces: number) {
  const lines = Array.isArray(string) ? string : string.split("\n");
  let s = "";
  if (lines.length) {
    const i0 = indent(firstLineSpaces === undefined ? spaces : firstLineSpaces);
    s = i0 + lines.shift();
  }
  if (lines.length) {
    const i = indent(spaces);
    s += "\n" + lines.map((l: string) => i + l).join("\n");
  }
  return s;
}

function foldLines(
  string: string | Array<string>,
  spaces: number,
  firstLineSpaces: number,
  charsPerLine = maxCharsPerLine()
) {
  return indentLines(wrapAnsi(string, charsPerLine), spaces, firstLineSpaces);
}

function colorize(text: string) {
  return text
    .replace(/\[[^ ]+]/g, (m) => formateChalk.grey(m))
    .replace(/<[^ ]+>/g, (m) => formateChalk.green(m))
    .replace(/ (-[-\w,]+)/g, (m) => formateChalk.bold(m))
    .replace(/`([^`]+)`/g, (_, m) => formateChalk.bold.cyan(m));
}

function box(message: string, title: string, options: BoxenOption) {
  return (
    boxen(
      [
        title || formateChalk.white("Message"),
        "",
        formateChalk.white(foldLines(message, 0, 0)),
      ].join("\n"),
      Object.assign(
        {
          borderColor: "white",
          borderStyle: "round",
          padding: 1,
          margin: 1,
        },
        options
      )
    ) + "\n"
  );
}

function successBox(message: string, title: string) {
  return box(message, title || formateChalk.green("✔ Success"), {
    borderColor: "green",
  });
}

function warningBox(message: string, title: string) {
  return box(message, title || formateChalk.yellow("⚠ Warning"), {
    borderColor: "yellow",
  });
}

function errorBox(message: string, title: string) {
  return box(message, title || formateChalk.red("✖ Error"), {
    borderColor: "red",
  });
}

function fatalBox(message: string, title: string) {
  return errorBox(message, title || formateChalk.red("✖ Fatal Error"));
}

module.exports = {
  maxCharsPerLine,
  indent,
  indentLines,
  foldLines,
  colorize,
  box,
  successBox,
  warningBox,
  errorBox,
  fatalBox,
};
