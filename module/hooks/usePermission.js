import { useSelector } from "react-redux";

const usePermission = () => {
  const { userDetails, currentStoreData } = useSelector((state) => state.user);

  const checkPermission = (module, subModule, askedPermission) => {
    let isAllowed = false;
    userDetails?.permissions?.map((permission) => {
      if (
        parseInt(permission.store_id) === parseInt(currentStoreData?.id) ||
        userDetails?.is_super_admin
      ) {
        permission.permissions?.map((mod) => {
          if (mod.module?.toLowerCase() === module?.toLowerCase()) {
            if (subModule) {
              mod.sub_module?.map((sub) => {
                if (
                  sub.sub_module?.toLowerCase() === subModule?.toLowerCase()
                ) {
                  if (askedPermission) {
                    if (sub.permissions?.includes(askedPermission)) {
                      isAllowed = true;
                    }
                  } else {
                    isAllowed = true;
                  }
                }
              });
            } else {
              isAllowed = true;
            }
          }
        });
      }
    });
    return isAllowed;
  };

  return checkPermission;
};

export default usePermission;
