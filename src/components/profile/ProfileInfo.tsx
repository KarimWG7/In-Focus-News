import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProfileInfoProps {
  fullName: string;
  email: string;
  onEditClick?: () => void;
}

export default function ProfileInfo({
  fullName,
  email,
  onEditClick,
}: ProfileInfoProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-4">
        <div className="flex min-w-72 flex-col gap-2">
          <p className="text-foreground text-4xl font-black leading-tight tracking-[-0.033em]">
            Profile
          </p>
          <p className="text-muted-foreground text-base font-normal leading-normal">
            View and manage your personal information.
          </p>
        </div>
        <Button variant="outline" onClick={onEditClick}>
          Edit Profile
        </Button>
      </div>

      <div className="mt-6 grid grid-cols-[1fr_2fr] sm:grid-cols-[20%_1fr] gap-x-6">
        <div className="col-span-2 grid grid-cols-subgrid border-t border-border py-5">
          <p className="text-muted-foreground text-sm font-medium leading-normal">
            Full Name
          </p>
          <p className="text-foreground text-sm font-normal leading-normal">
            {fullName}
          </p>
        </div>
        <div className="col-span-2 grid grid-cols-subgrid border-t border-border py-5">
          <p className="text-muted-foreground text-sm font-medium leading-normal">
            Email Address
          </p>
          <p className="text-foreground text-sm font-normal leading-normal">
            {email}
          </p>
        </div>
      </div>
    </Card>
  );
}
