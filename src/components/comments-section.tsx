import React from "react";

import { StarIcon } from "lucide-react";

import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function CommentsSection() {
  return (
    <div className="mt-12">
      <h2 className="mb-4 text-2xl font-bold">Comments and Ratings</h2>
      <div className="grid gap-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">John Doe</div>
              <div className="flex items-center gap-1 text-primary">
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">
              Acme Token is a game-changer in the crypto space. The team has
              done an amazing job with the project.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">Jane Smith</div>
              <div className="flex items-center gap-1 text-primary">
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
              </div>
            </div>
            <p className="text-muted-foreground">
              I've been using Acme Token for a few months now and I'm impressed
              with the user experience and the team's commitment to the project.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">Alex Johnson</div>
              <div className="flex items-center gap-1 text-primary">
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">
              I'm a bit disappointed with the Acme Token project. The team needs
              to work on improving the user experience and addressing some of
              the technical issues.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="font-medium">Emily Davis</div>
              <div className="flex items-center gap-1 text-primary">
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5" />
                <StarIcon className="h-5 w-5 fill-muted stroke-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground">Token Description</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="comment">Leave a Comment</Label>
            <Textarea id="comment" placeholder="Write your comment here..." />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rating">Rate this Token</Label>
            <RadioGroup
              id="rating"
              defaultValue="4"
              className="flex items-center gap-2"
            >
              <Label
                htmlFor="rating-1"
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="rating-1" value="1" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </Label>
              <Label
                htmlFor="rating-2"
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="rating-2" value="2" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </Label>
              <Label
                htmlFor="rating-3"
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="rating-3" value="3" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </Label>
              <Label
                htmlFor="rating-4"
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="rating-4" value="4" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </Label>
              <Label
                htmlFor="rating-5"
                className="flex cursor-pointer items-center gap-2 rounded-md border p-2 [&:has(:checked)]:bg-muted"
              >
                <RadioGroupItem id="rating-5" value="5" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
                <StarIcon className="h-5 w-5 fill-primary" />
              </Label>
            </RadioGroup>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
}
