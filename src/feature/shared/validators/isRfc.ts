import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions
} from "class-validator";

export function IsRfc(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isRfc",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isValidRfc(value);
        },
        defaultMessage(_args: ValidationArguments) {
          return "RFC invalido para persona fisica o moral";
        }
      }
    });
  };
}

function isValidRfc(value: unknown): boolean {
  if (typeof value !== "string") return false;

  const normalized = value.trim().toUpperCase();
  if (normalized.length !== 12 && normalized.length !== 13) return false;

  const prefixLength = normalized.length === 12 ? 3 : 4;
  const prefix = normalized.slice(0, prefixLength);
  const datePart = normalized.slice(prefixLength, prefixLength + 6);
  const suffix = normalized.slice(prefixLength + 6);

  if (!/^[A-Z&]+$/.test(prefix)) return false;
  if (!/^\d{6}$/.test(datePart)) return false;
  if (!/^[A-Z0-9]{3}$/.test(suffix)) return false;

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
