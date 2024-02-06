import { Container, CssBaseline, Paper, Typography } from '@mui/material';
import SignupForm from './Signupform';

const formData = [
  {
    label: 'Full Name',
    name: 'fullName',
    type: 'TEXT',
    required: true,
    defaultValue: "John Doe",
    minLength: 1,
    maxLength: 100
  },
  {
    label: 'Email',
    name: 'email',
    type: 'TEXT',
    required: true,
    defaultValue: "hello@mail.com",
    minLength: 1,
    maxLength: 50,
    customValidation: (value: string) => {
      if (!value.includes('@')) {
        return 'Invalid email format';
      }
      return undefined;
    },
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'RADIO',
    options: ['Male', 'Female', 'Others'],
    required: true,
    defaultValue: 'Male'
  },
  {
    label: 'Love React?',
    name: 'loveReact',
    type: 'RADIO',
    defaultValue: 'Yes',
    required: false,
    options: ['Yes', 'No'],
  },

];

const Home: React.FC = () => {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={3} style={{ height: "38rem", padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography component="h1" variant="h5" style={{ marginBottom: '20px' }}>
          Signup Form
        </Typography>
        <SignupForm formData={formData} />
      </Paper>
    </Container>
  );
};

export default Home;




