import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
// import { useNotification } from './NotificationProvider';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    
    // TODO: Log error to error reporting service
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRefresh = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'calc(100vh - 200px)',
              textAlign: 'center',
              py: 8,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: 'error.main',
                mb: 2,
                fontWeight: 'bold',
              }}
            >
              Oops! Something went wrong
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 'sm',
              }}
            >
              We apologize for the inconvenience. Please try refreshing the page or come back later.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<RefreshIcon />}
              onClick={this.handleRefresh}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
              }}
            >
              Refresh Page
            </Button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mt: 4, textAlign: 'left', width: '100%' }}>
                <Typography variant="h6" color="error" gutterBottom>
                  Error Details:
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    p: 2,
                    bgcolor: 'grey.100',
                    borderRadius: 1,
                    overflow: 'auto',
                    fontSize: '0.875rem',
                  }}
                >
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 