import { configureStore } from "@reduxjs/toolkit";
import { createAuthApi } from "./services/auth";
import { userApi } from "./services/user";
import { servicesApi } from "./services/service";
import { availabilityApi } from "./services/availability";

export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  reducer: {
    [createAuthApi.reducerPath]: createAuthApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [availabilityApi.reducerPath]: availabilityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      createAuthApi.middleware,
      userApi.middleware,
      servicesApi.middleware,
      availabilityApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
