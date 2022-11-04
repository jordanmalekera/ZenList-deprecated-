import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'react-redux'
import { store } from './app/store';
import { QueryClientProvider, QueryClient } from 'react-query';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={ queryClient }>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>

    );
  }
}
