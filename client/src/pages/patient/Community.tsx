import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Users, MessageSquare, Heart, Plus, Pin, Calendar, TrendingUp } from 'lucide-react';
import { communityAPI } from '@/lib/api';
import type { ProgressStory, ForumPost } from '@/types';

export default function CommunityPage() {
  const [stories, setStories] = useState<ProgressStory[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stories');
  const [storyDialogOpen, setStoryDialogOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [filterCondition, setFilterCondition] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [storiesRes, postsRes] = await Promise.all([
        communityAPI.getProgressStories(),
        communityAPI.getForumPosts(),
      ]);
      setStories(storiesRes.data);
      setForumPosts(postsRes.data);
    } catch (error) {
      console.error('Error loading community data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitStory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await communityAPI.submitStory({
        title: formData.get('title') as string,
        description: formData.get('description') as string,
      });

      loadData();
      setStoryDialogOpen(false);
    } catch (error) {
      console.error('Error submitting story:', error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await communityAPI.createForumPost({
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        category: formData.get('category') as string,
      });

      loadData();
      setPostDialogOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const filteredStories = stories.filter((story) =>
    filterCondition === 'All' || story.condition === filterCondition
  );

  const filteredPosts = forumPosts.filter((post) =>
    filterCondition === 'All' || post.category === filterCondition
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with others on their wellness journey
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-pink-600" />
            <p className="text-2xl font-bold">128</p>
            <p className="text-xs text-muted-foreground">Members</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-4 text-center">
            <MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold">{forumPosts.length}</p>
            <p className="text-xs text-muted-foreground">Discussions</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20">
          <CardContent className="p-4 text-center">
            <Heart className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{stories.length}</p>
            <p className="text-xs text-muted-foreground">Stories</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto">
        {['All', 'PCOD', 'Fertility', 'General'].map((condition) => (
          <Badge
            key={condition}
            variant={filterCondition === condition ? 'default' : 'outline'}
            className="cursor-pointer whitespace-nowrap"
            onClick={() => setFilterCondition(condition)}
          >
            {condition}
          </Badge>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stories" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Progress Stories
          </TabsTrigger>
          <TabsTrigger value="forum" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Forum
          </TabsTrigger>
        </TabsList>

        {/* Progress Stories Tab */}
        <TabsContent value="stories" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Dialog open={storyDialogOpen} onOpenChange={setStoryDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Share Your Story
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Your Progress Story</DialogTitle>
                  <DialogDescription>
                    Inspire others by sharing your wellness journey
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmitStory} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="My Journey to Wellness"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Your Story</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Tell us about your journey..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Submit Story
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredStories.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No stories found</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStories.map((story) => (
                <Card
                  key={story.id}
                  className="overflow-hidden transition-all hover:shadow-lg group"
                >
                  <div className="flex gap-4 p-6">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                      <img
                        src={story.before_after_image}
                        alt={story.patient_name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {story.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            by {story.patient_name}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {story.description}
                      </p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs">
                          {story.condition}
                        </Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {story.days_in_program} days
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Forum Tab */}
        <TabsContent value="forum" className="space-y-4 mt-4">
          <div className="flex justify-end">
            <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Discussion
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start a Discussion</DialogTitle>
                  <DialogDescription>
                    Ask questions and share insights with the community
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="post-title">Title</Label>
                    <Input
                      id="post-title"
                      name="title"
                      placeholder="Discussion title..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      name="category"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      required
                    >
                      <option value="PCOD">PCOD</option>
                      <option value="Fertility">Fertility</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Share your thoughts..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Post Discussion
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No discussions found</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="cursor-pointer transition-all hover:shadow-md group"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {post.is_pinned && (
                        <Pin className="h-4 w-4 flex-shrink-0 text-primary mt-1" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          by {post.patient_name}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="secondary" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            {post.replies_count} replies
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
