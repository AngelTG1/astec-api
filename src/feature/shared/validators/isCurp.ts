import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from "class-validator";

const CURP_REGEX =
  /^[A-Z][AEIOU][A-Z]{2}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;

export function IsCurp(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isCurp",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isValidCurp(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return "CURP invalida";
        }
      }
    });
  };
}

function isValidCurp(value: unknown): boolean {
  if (typeof value !== "string") return false;

  const normalized = value.trim().toUpperCase();
  if (normalized.length !== 18) return false;
  if (!CURP_REGEX.test(normalized)) return false;

  const datePart = normalized.slice(4, 10);
  return isValidDatePart(datePart);
}

function isValidDatePart(datePart: string): boolean {
  const year = Number(datePart.slice(0, 2));
  const month = Number(datePart.slice(2, 4));
  const day = Number(datePart.slice(4, 6));

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }

  if (month < 1 || month > 12) return false;
  if (day < 1) return false;

  const fullYear = 2000 + year;
  const maxDay = new Date(fullYear, month, 0).getDate();
  return day <= maxDay;
}
