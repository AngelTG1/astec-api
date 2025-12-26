import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments
} from "class-validator";

export function IsTodayOrFuture(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTodayOrFuture",
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (!value) return false;

          const inputDate = parseDateOnly(value);
          if (!inputDate) return false;

          const today = new Date();
          today.setHours(0, 0, 0, 0);

          return inputDate >= today;
        },
        defaultMessage(args: ValidationArguments) {
          return "La fecha no puede ser menor a la fecha actual";
        }
      }
    });
  };
}

function parseDateOnly(value: any): Date | null {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return null;
    const local = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    local.setHours(0, 0, 0, 0);
    return local;
  }

  if (typeof value === "string") {
    const parts = value.split("-");
    if (parts.length === 3) {
      const year = Number(parts[0]);
      const month = Number(parts[1]);
      const day = Number(parts[2]);
      if (
        Number.isInteger(year) &&
        Number.isInteger(month) &&
        Number.isInteger(day)
      ) {
        const local = new Date(year, month - 1, day);
        local.setHours(0, 0, 0, 0);
        return local;
      }
    }
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  const local = new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
  local.setHours(0, 0, 0, 0);
  return local;
}
