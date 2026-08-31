"use client";

import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { RbacDomainService } from "@/domain/rbac/services";

export function useAuth() {
  const { data: session, status } = useSession();

  const user = session?.user;
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const roles = user?.roles;
  const permissions = user?.permissions;

  const hasRole = useCallback(
    (role: string) => {
      if (!roles) return false;

      return RbacDomainService.hasRole(roles, role);
    },
    [roles],
  );

  const hasAnyRole = useCallback(
    (rolesToCheck: string[]) => {
      if (!roles) return false;

      return RbacDomainService.hasAnyRole(roles, rolesToCheck);
    },
    [roles],
  );
  
    const hasPermission = useCallback(
    (permission: string) => {
      if (!permissions || !roles) return false;

      return RbacDomainService.hasPermission(
        permissions,
        roles,
        permission,
      );
    },
    [permissions, roles],
  );

  const hasAnyPermission = useCallback(
    (permissionsToCheck: string[]) => {
      if (!permissions || !roles) return false;

      return RbacDomainService.hasAnyPermission(
        permissions,
        roles,
        permissionsToCheck,
      );
    },
    [permissions, roles],
  );

  const hasAllPermissions = useCallback(
    (permissionsToCheck: string[]) => {
      if (!permissions || !roles) return false;

      return RbacDomainService.hasAllPermissions(
        permissions,
        roles,
        permissionsToCheck,
      );
    },
    [permissions, roles],
  );

  const isSuperAdmin = useMemo(
    () => (roles ? RbacDomainService.isSuperAdmin(roles) : false),
    [roles],
  );

  const isAdmin = useMemo(
    () => (roles ? RbacDomainService.isAdmin(roles) : false),
    [roles],
  );

  return {
    user,
    session,
    status,
    isAuthenticated,
    isLoading,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isSuperAdmin,
    isAdmin,
  };
}
