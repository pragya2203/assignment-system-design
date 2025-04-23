
import React from 'react';
import { Heading, Text } from '@/components/foundations/typography/Typography';
import { Input } from '@/components/data-entry/input/Input';
import { Toggle } from '@/components/data-entry/toggle/Toggle';
import { Alert } from '@/components/feedback/alert/Alert';
import { Toast, ToastProvider, useToast } from '@/components/feedback/toast/Toast';

const IndexPage = () => {
  const { toast } = useToast();
  const [inputValue, setInputValue] = React.useState('');
  const [darkMode, setDarkMode] = React.useState(false);
  
  // Toggle dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (variant: 'default' | 'info' | 'success' | 'warning' | 'error') => {
    const titles = {
      default: 'Notification',
      info: 'Information',
      success: 'Success',
      warning: 'Warning',
      error: 'Error',
    };
    
    const descriptions = {
      default: 'This is a notification message',
      info: 'Here\'s something you should know',
      success: 'Your changes have been saved',
      warning: 'Your storage is almost full',
      error: 'There was a problem with your request',
    };
    
    const icons = {
      default: null,
      info: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-600 dark:text-blue-400"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
      ),
      success: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-green-600 dark:text-green-400"
        >
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      warning: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-600 dark:text-amber-400"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      ),
      error: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-red-600 dark:text-red-400"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
      ),
    };
    
    toast({
      title: titles[variant],
      description: descriptions[variant],
      variant,
      icon: icons[variant],
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Heading level="h1">Design System</Heading>
          <Toggle
            label="Dark Mode"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
        </div>

        {/* Typography Section */}
        <section className="mb-12">
          <Heading level="h2" className="mb-6">Typography</Heading>
          <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm border">
            <div>
              <Heading level="h1">Heading 1</Heading>
              <Text variant="caption">Used for main page titles</Text>
            </div>
            <div>
              <Heading level="h2">Heading 2</Heading>
              <Text variant="caption">Used for section titles</Text>
            </div>
            <div>
              <Heading level="h3">Heading 3</Heading>
              <Text variant="caption">Used for sub-sections</Text>
            </div>
            <div>
              <Heading level="h4">Heading 4</Heading>
              <Text variant="caption">Used for card titles</Text>
            </div>
            <div>
              <Heading level="h5">Heading 5</Heading>
              <Text variant="caption">Used for widget headers</Text>
            </div>
            <div>
              <Heading level="h6">Heading 6</Heading>
              <Text variant="caption">Used for small elements</Text>
            </div>
            
            <div className="pt-4">
              <Text variant="body">Body text is used for main content areas, providing clear and readable information.</Text>
            </div>
            <div>
              <Text variant="label">Label Text</Text>
              <Text variant="caption">Used for form labels and small headings</Text>
            </div>
            <div>
              <Text variant="caption">Caption Text - Used for secondary information</Text>
            </div>
            <div>
              <Text variant="helper">Helper Text - Used for additional guidance in forms and UI elements</Text>
            </div>
          </div>
        </section>

        {/* Data Entry Section */}
        <section className="mb-12">
          <Heading level="h2" className="mb-6">Data Entry Components</Heading>
          
          <div className="space-y-8 bg-card p-6 rounded-lg shadow-sm border">
            {/* Text Input */}
            <div>
              <Heading level="h3" className="mb-4">Text Input</Heading>
              <div className="space-y-4 max-w-md">
                <Input
                  label="Default Input"
                  placeholder="Enter your name"
                  helperText="This is a standard text input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                
                <Input
                  label="With Icon"
                  placeholder="Search..."
                  leadingIcon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  }
                />
                
                <Input
                  label="Email"
                  type="email"
                  placeholder="your@email.com"
                  error={true}
                  errorMessage="Please enter a valid email address"
                />
                
                <Input
                  label="Disabled Input"
                  value="Disabled value"
                  disabled
                />
              </div>
            </div>
            
            {/* Toggle */}
            <div className="pt-4">
              <Heading level="h3" className="mb-4">Toggle Switch</Heading>
              <div className="space-y-4 max-w-md">
                <Toggle
                  label="Notifications"
                  defaultChecked
                  helperText="Receive email notifications"
                />
                
                <Toggle
                  label="Auto-save"
                  defaultChecked={false}
                  helperText="Automatically save your changes"
                />
                
                <Toggle
                  label="Advanced Mode"
                  defaultChecked
                  size="lg"
                  helperText="Enable advanced features"
                />
                
                <Toggle
                  label="Disabled Toggle"
                  defaultChecked
                  disabled
                  helperText="This control cannot be changed"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Feedback Section */}
        <section className="mb-12">
          <Heading level="h2" className="mb-6">Feedback Components</Heading>
          
          <div className="space-y-8 bg-card p-6 rounded-lg shadow-sm border">
            {/* Alerts */}
            <div>
              <Heading level="h3" className="mb-4">Alert Banner</Heading>
              <div className="space-y-4">
                <Alert variant="info" title="Information">
                  This is an informational message for users.
                </Alert>
                
                <Alert 
                  variant="success" 
                  title="Success"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600 dark:text-green-400"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  }
                >
                  Your settings have been successfully saved.
                </Alert>
                
                <Alert 
                  variant="warning" 
                  title="Warning"
                  dismissible 
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-amber-600 dark:text-amber-400"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  }
                >
                  Your session will expire in 5 minutes. Please save your work.
                </Alert>
                
                <Alert 
                  variant="error" 
                  title="Error" 
                  dismissible
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-600 dark:text-red-400"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  }
                >
                  There was an error processing your request. Please try again.
                </Alert>
              </div>
            </div>
            
            {/* Toast */}
            <div className="pt-4">
              <Heading level="h3" className="mb-4">Toast Notifications</Heading>
              <div className="space-y-4">
                <Text variant="body" className="mb-4">
                  Click the buttons below to see different toast notifications:
                </Text>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => showToast("default")}
                    className="px-4 py-2 bg-background border rounded-md text-sm font-medium hover:bg-muted"
                  >
                    Default Toast
                  </button>
                  <button
                    onClick={() => showToast("info")}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md text-sm font-medium hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-100 dark:hover:bg-blue-800"
                  >
                    Info Toast
                  </button>
                  <button
                    onClick={() => showToast("success")}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-md text-sm font-medium hover:bg-green-200 dark:bg-green-900 dark:text-green-100 dark:hover:bg-green-800"
                  >
                    Success Toast
                  </button>
                  <button
                    onClick={() => showToast("warning")}
                    className="px-4 py-2 bg-amber-100 text-amber-800 rounded-md text-sm font-medium hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-100 dark:hover:bg-amber-800"
                  >
                    Warning Toast
                  </button>
                  <button
                    onClick={() => showToast("error")}
                    className="px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm font-medium hover:bg-red-200 dark:bg-red-900 dark:text-red-100 dark:hover:bg-red-800"
                  >
                    Error Toast
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Index = () => (
  <ToastProvider>
    <IndexPage />
  </ToastProvider>
);

export default Index;
