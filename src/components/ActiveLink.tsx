import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement, useMemo } from "react";

interface IActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: IActiveLinkProps) {
  const { asPath } = useRouter();

  const isActive = useMemo(() => {
    if (shouldMatchExactHref) {
      if (asPath === rest.href || asPath === rest.as) {
        return true;
      }

      return false;
    } else {
      if (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as))) {
        return true;
      }

      return false;
    }
  }, [shouldMatchExactHref, asPath, rest.href, rest.as]);

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50",
      })}
    </Link>
  );
}
