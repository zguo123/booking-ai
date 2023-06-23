import { useRetrieveAppointmentsQuery } from "@/redux/services/bookAppointment";
import useAuthInfo from "./useAuthInfo";

const useAppointmentInfo = () => {
  const { user, isLoading: isAuthLoading } = useAuthInfo();

  const {
    data: appointmentData,
    isLoading: isAppointmentLoading,
  } = useRetrieveAppointmentsQuery({
    userId: user?._id as string,
  });

  return {
    ...appointmentData,
    isAppointmentLoading,
    isAuthLoading,
  };
};

export default useAppointmentInfo;
