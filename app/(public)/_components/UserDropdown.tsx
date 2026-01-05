import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import { useSignOut } from "@/hooks/use-signout";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const handleLogout = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative h-9 w-9 rounded-full outline-none ring-offset-background transition-all hover:ring-2 hover:ring-primary/20 focus-visible:ring-2 focus-visible:ring-primary">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user.image || ""} alt={user.name} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 p-2 rounded-xl"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-semibold leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="mx-2" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem className="rounded-lg py-2 cursor-pointer" asChild>
            <Link href="/">
              <Home className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg py-2 cursor-pointer" asChild>
            <Link href="/courses">
              <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>Courses</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-lg py-2 cursor-pointer" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-2" />
        <DropdownMenuGroup className="p-1">
          <DropdownMenuItem
            className="rounded-lg py-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
