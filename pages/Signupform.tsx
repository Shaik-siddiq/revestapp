import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';

interface FormData {
  [key: string]: string;
}

interface FieldProps {
  label: string;
  name: string;
  type: string;
  options?: string[];
  defaultValue?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  customValidation?: (value: string) => string | undefined;

}

interface SignupFormProps {
  formData: FieldProps[];
}

const SignupForm: React.FC<SignupFormProps> = ({ formData }) => {  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      fullName: "John Doe",
      email: "hello@mail.com",
      gender: "Male",
      loveReact: "Yes",
    }
  });
  
  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const renderField = (field: FieldProps) => {
    const { label, name, type, options, defaultValue, required, minLength, maxLength, customValidation } = field;
  
    const commonProps = {
      ...register(name, {
        required: required? `please enter proper ${label}`:false,
        minLength: minLength ? { value: minLength, message: `${label} must be at least ${minLength} characters` } : undefined,
        maxLength: maxLength ? { value: maxLength, message: `${label} must not exceed ${maxLength} characters` } : undefined,
        validate: customValidation ? (value) => customValidation(value) : undefined,
      }),
      defaultValue: defaultValue,
    };
  
    switch (type) {
      case 'TEXT':
        return (
          <div>
            <TextField fullWidth label={label} variant="outlined" {...commonProps} />
            <FormHelperText error={!!errors[name]}>{errors[name]?.message}</FormHelperText>
          </div>
        );
      case 'LIST':
        return (
          <FormControl fullWidth variant="outlined">
            <InputLabel>{label}</InputLabel>
            <Select {...commonProps}>
              {options &&
                options.map((option: string, index: number) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText error={!!errors[name]}>{errors[name]?.message}</FormHelperText>
          </FormControl>
        );
        case 'RADIO':
          return (
            <FormControl component="fieldset">
              <label>{label}</label>
              <RadioGroup row aria-label={label} name={name} defaultValue={defaultValue}>
                {options &&
                  options.map((option: string, index: number) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      {...register(name)} 
                    />
                  ))}
              </RadioGroup>
              <FormHelperText error={!!errors[name]}>{errors[name]?.message}</FormHelperText>
            </FormControl>
          );        
      default:
        return null;
    }
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {formData.map((field: FieldProps, index: number) => (
        <div key={index} style={{ marginBottom: '16px' }}>
          {renderField(field)}
        </div>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default SignupForm;
