import {
  TextField,
  OutlinedTextFieldProps,
  CheckboxProps,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

// Chỉ sử dụng TextFieldProps thay vì kết hợp với InputHTMLAttributes
interface InputFieldProps<T extends FieldValues>
  extends Omit<OutlinedTextFieldProps, "name"> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  errorMessage: string | undefined;
  type: "text" | "checkbox" | "datetime-local";
}

const InputFields = <T extends FieldValues>({
  control,
  name,
  label,
  type,
  errorMessage,
  ...props
}: InputFieldProps<T>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              {type == "text" && (
                <TextField
                  {...field} // Truyền các props field từ react-hook-form
                  label={label}
                  fullWidth
                  error={!!errorMessage} // Hiển thị trạng thái lỗi
                  helperText={errorMessage} // Hiển thị nội dung lỗi
                  {...props} // Truyền các props khác như variant, size, placeholder, v.v.
                />
              )}
              {type == "checkbox" && (
                <FormControlLabel
                  control={<Checkbox {...(props as CheckboxProps)} />}
                  label={label}
                />
              )}
              {type == "datetime-local" && (
                <TextField
                  error={!!errorMessage} // Hiển thị trạng thái lỗi
                  helperText={errorMessage} // Hiển thị nội dung lỗi
                  type={type}
                  {...field} // Truyền các props field từ react-hook-form
                  fullWidth
                  {...props} // Truyền các props khác như variant, size, placeholder, v.v.
                />
              )}
            </>
          );
        }}
      />
    </>
  );
};

export default InputFields;
