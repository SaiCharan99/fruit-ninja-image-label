import React from "react";
import { motion } from "framer-motion";
import { Settings, PencilLine } from "lucide-react";
import { sampleImages, floorTypes } from "../constants";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Pill from "../components/ui/Pill";
import SectionTitle from "../components/ui/SectionTitle";
import RobustImage from "../components/ui/RobustImage";

interface ProfileViewProps {
  points: number;
}

const ProfileView: React.FC<ProfileViewProps> = ({ points }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="space-y-6"
    >
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Your profile</h1>
          <p className="text-white/60">
            Manage your info, see stats, and celebrate wins.
          </p>
        </div>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" /> Settings
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-xl font-semibold">
              SC
            </div>
            <div>
              <div className="text-lg font-semibold text-white">Sai Charan</div>
              <div className="text-sm text-white/60">@senstride_user</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-2xl font-semibold text-white">{points}</div>
              <div className="text-xs text-white/60">Points</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">312</div>
              <div className="text-xs text-white/60">Images</div>
            </div>
            <div>
              <div className="text-2xl font-semibold text-white">4.9★</div>
              <div className="text-xs text-white/60">Quality</div>
            </div>
          </div>
          <Button className="mt-6 w-full">
            <PencilLine className="mr-2 h-4 w-4" /> Edit profile
          </Button>
        </Card>

        <Card className="p-6 md:col-span-2">
          <SectionTitle
            title="Recent activity"
            subtitle="Your last contributions"
          />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-xl bg-white/5 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 overflow-hidden rounded-lg">
                    <RobustImage
                      src={sampleImages[i % sampleImages.length].url}
                      alt="Thumb"
                      className="h-10 w-16 object-cover"
                      fallbackText="Thumb"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">
                      Labeled • {floorTypes[i % floorTypes.length].name}
                    </div>
                    <div className="text-xs text-white/60">
                      Notes: good lighting, no glare
                    </div>
                  </div>
                </div>
                <Pill className="bg-white/10 text-white/80">+10 pts</Pill>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.section>
  );
};

export default ProfileView;
