const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.familie.ekstern.dev.nav.no");

type SanityConfig = { dataset: string; projectId: string;}
type Environment = { env: string; sanityConfig: SanityConfig};

const getEnvironment = (): Environment => {
    if (isProduction) {
        return {
            env: "prod",
            sanityConfig: {
                dataset: "prod-v2023",
                projectId: "8wpntadz",
            },
        };
    }
    if (isDevelopment) {
        return {
            env: "dev",
            sanityConfig: {
                dataset: "test",
                projectId: "8wpntadz",
            },
        };
    }
    return {
        env: "dev",
        sanityConfig: {
            dataset: "test",
            projectId: "8wpntadz",
        },
    };
};

export const appEnv = getEnvironment();
