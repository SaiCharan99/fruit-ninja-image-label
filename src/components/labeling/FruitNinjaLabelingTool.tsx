import React, { useEffect, useState } from "react";
import { ImageData, BatchLabelPayload } from "../../types";
import { floorTypes } from "../../constants";
import Card from "../ui/Card";
import Button from "../ui/Button";

interface FruitNinjaLabelingToolProps {
  images: ImageData[];
  selectedAvatar: string;
  onSubmit: (payload: BatchLabelPayload) => void;
}

const FruitNinjaLabelingTool: React.FC<FruitNinjaLabelingToolProps> = ({
  images,
  selectedAvatar,
  onSubmit,
}) => {
  const [targetType, setTargetType] = useState<string>("");
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState(6); // Default speed
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  const startGame = (type: string) => {
    setTargetType(type);
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setScrollPosition(0);
    setSelectedImages(new Set());
    setGameOver(false);
    setGameCompleted(false);
  };

  const handleImageTap = (imageId: string) => {
    if (gameOver || gameCompleted) return;

    // Add to selected images
    setSelectedImages((prev) => new Set([...prev, imageId]));
    setScore(score + 10);

    // Check if we've collected enough images
    if (selectedImages.size + 1 >= 20) {
      // Collect 20 images to win
      setGameCompleted(true);
      onSubmit({
        labeledCount: selectedImages.size + 1,
        labels: Array.from([...selectedImages, imageId]).map((id) => ({
          imageId: id,
          type: targetType,
        })),
      });
    }
  };

  // Continuous scrolling effect
  useEffect(() => {
    if (!gameStarted || gameOver || gameCompleted) return;

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + scrollSpeed; // Use dynamic scroll speed
        // Create infinite loop by resetting position smoothly
        if (newPosition >= images.length * 152) {
          // 128px height + 24px margin
          return 0; // Reset to top for seamless loop
        }
        return newPosition;
      });
    }, 32); // Reduced to 32ms for smoother scrolling

    return () => clearInterval(scrollInterval);
  }, [gameStarted, gameOver, gameCompleted, images.length, scrollSpeed]);

  if (!gameStarted) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-6">
          Choose your target floor type!
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {floorTypes.map((floorType) => (
            <button
              key={floorType.name}
              onClick={() => startGame(floorType.name)}
              className={`p-6 rounded-xl border-2 transition-all hover:scale-105 ${floorType.color} border-white/20 hover:border-white/40`}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{floorType.emoji}</div>
                <div className="text-white font-medium text-lg">
                  {floorType.name}
                </div>
              </div>
            </button>
          ))}
        </div>
        <p className="text-white/70 text-sm">
          Images will scroll down continuously. Select only{" "}
          {targetType || "the target type"} to score points!
        </p>
      </Card>
    );
  }

  if (gameOver) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">Game Over!</h3>
        <p className="text-white/70 mb-6">Final Score: {score} points</p>
        <div className="flex justify-center gap-3">
          <Button onClick={() => setGameStarted(false)}>Play Again</Button>
          <Button
            variant="outline"
            onClick={() => onSubmit({ labeledCount: 0, labels: [] })}
          >
            Back to Menu
          </Button>
        </div>
      </Card>
    );
  }

  if (gameCompleted) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">
          🎉 You Win! 🎉
        </h3>
        <p className="text-white/70 mb-6">Final Score: {score} points</p>
        <p className="text-white/70 mb-6">
          You collected {selectedImages.size} {targetType} images!
        </p>
        <div className="flex justify-center gap-3">
          <Button onClick={() => setGameStarted(false)}>Play Again</Button>
          <Button
            variant="outline"
            onClick={() =>
              onSubmit({
                labeledCount: selectedImages.size,
                labels: Array.from(selectedImages).map((id) => ({
                  imageId: id,
                  type: targetType,
                })),
              })
            }
          >
            Back to Menu
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Game Stats */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-sm text-white/70">Target:</span>{" "}
              <span className="font-semibold text-cyan-400">{targetType}</span>
            </div>
            <div className="text-white">
              <span className="text-sm text-white/70">Score:</span>{" "}
              <span className="font-semibold text-green-400">{score}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Lives:</span>
            {[...Array(lives)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-red-400 rounded-full"></div>
            ))}
          </div>
        </div>

        {/* Speed Control */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-sm text-white/70">Speed:</span>
          <input
            type="range"
            min="1"
            max="15"
            value={scrollSpeed}
            onChange={(e) => setScrollSpeed(Number(e.target.value))}
            className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <span className="text-sm text-white font-medium min-w-[2rem] text-center">
            {scrollSpeed}
          </span>
        </div>
      </Card>

      {/* Game Area */}
      <div className="relative h-[500px] w-full min-w-[800px] max-w-7xl mx-auto overflow-hidden rounded-2xl border border-white/20">
        {/* Scrolling Images */}
        <div
          className="absolute inset-0 will-change-transform smooth-scroll"
          style={{
            transform: `translateY(-${scrollPosition}px)`,
            backfaceVisibility: "hidden",
            width: "100%",
            minWidth: "800px",
          }}
        >
          {/* Duplicate images multiple times to create seamless loop in 2-column grid */}
          {[...images, ...images, ...images, ...images, ...images].map(
            (image, index) => (
              <div
                key={`${image.id}-${index}`}
                className="inline-block w-[calc(50%-16px)] h-32 mb-6 mx-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => handleImageTap(image.id)}
              >
                <div className="relative h-full">
                  <img
                    src={image.url}
                    alt="Floor image"
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => {
                      // Fallback to a placeholder if image fails to load
                      e.currentTarget.src = `https://via.placeholder.com/300x112/4B5563/FFFFFF?text=${
                        image.fallback || "Floor"
                      }`;
                    }}
                  />
                  {/* Tap indicator */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                    <div className="text-white text-lg font-bold">TAP!</div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Instructions */}
      <Card className="p-4">
        <p className="text-center text-white/70 text-sm">
          Tap on images that show {targetType}! Collect 20 images to win. Images
          scroll continuously - be quick and accurate!
        </p>
      </Card>
    </div>
  );
};

export default FruitNinjaLabelingTool;
