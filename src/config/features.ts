export type Environment = 'development' | 'staging' | 'production';

interface FeatureFlags {
  showJourneyPage: boolean;
}

const features: Record<Environment, FeatureFlags> = {
  development: {
    showJourneyPage: true,
  },
  staging: {
    showJourneyPage: true,
  },
  production: {
    showJourneyPage: false,
  },
};

export const getCurrentEnvironment = (): Environment => {
  // You can modify this logic based on your deployment setup
  if (import.meta.env.PROD) {
    return 'production';
  }
  return 'development';
};

export const getFeatureFlags = (): FeatureFlags => {
  const environment = getCurrentEnvironment();
  return features[environment];
};