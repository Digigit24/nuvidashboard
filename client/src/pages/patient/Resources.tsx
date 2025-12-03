import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Search, Clock, BookOpen, FileText, ChevronRight } from 'lucide-react';
import { resourcesAPI } from '@/lib/api';
import type { Resource } from '@/types';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterCondition, setFilterCondition] = useState('All');

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const response = await resourcesAPI.getAll();
      setResources(response.data);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadResourceDetails = async (id: number) => {
    try {
      const response = await resourcesAPI.getById(id);
      setSelectedResource(response.data);
    } catch (error) {
      console.error('Error loading resource details:', error);
    }
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.content_preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || resource.category === filterCategory;
    const matchesCondition = filterCondition === 'All' || resource.condition === filterCondition;
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Articles':
        return <FileText className="h-4 w-4" />;
      case 'Guides':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 rounded-full blur-2xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg">
            <BookOpen className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Resources</h1>
            <p className="text-white/90 text-lg mt-1">
              Learn more about health and wellness
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <div className="flex gap-2">
            {['All', 'Articles', 'Guides'].map((category) => (
              <Badge
                key={category}
                variant={filterCategory === category ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setFilterCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex gap-2">
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
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-2/3" />
              </CardContent>
            </Card>
          ))
        ) : filteredResources.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No resources found</p>
          </Card>
        ) : (
          filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="cursor-pointer transition-all hover:shadow-lg group overflow-hidden"
              onClick={() => loadResourceDetails(resource.id)}
            >
              <div className="flex gap-4 p-6">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <ChevronRight className="h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {resource.content_preview}
                  </p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryIcon(resource.category)}
                      <span className="ml-1">{resource.category}</span>
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {resource.condition}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {resource.read_time_mins} min read
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Resource Detail Dialog */}
      <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedResource && (
            <>
              <div className="relative h-64 -mx-6 -mt-6 mb-6 overflow-hidden">
                <img
                  src={selectedResource.thumbnail}
                  alt={selectedResource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedResource.title}
                  </h2>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedResource.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      {selectedResource.condition}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/60 text-white">
                      <Clock className="h-3 w-3 mr-1" />
                      {selectedResource.read_time_mins} min read
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {selectedResource.author && (
                  <p className="text-sm text-muted-foreground">
                    By {selectedResource.author}
                  </p>
                )}
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {selectedResource.content ? (
                    <div dangerouslySetInnerHTML={{ __html: selectedResource.content.replace(/\n/g, '<br />') }} />
                  ) : (
                    <p>{selectedResource.content_preview}</p>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
