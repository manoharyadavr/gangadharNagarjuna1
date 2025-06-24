import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/integrations/mongodb/client';
import type { MeetingLink } from '@/integrations/mongodb/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Loader2, Save, Plus, Edit, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface CreateMeetingLinkData {
  title: string;
  link: string;
  description?: string;
  isActive: boolean;
}

const fetchMeetingLinks = async (): Promise<MeetingLink[]> => {
  const response = await apiClient.get('/meeting-links');
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to fetch meeting links');
};

const createMeetingLink = async (linkData: CreateMeetingLinkData): Promise<MeetingLink> => {
  const response = await apiClient.post('/meeting-links', linkData);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to create meeting link');
};

const updateMeetingLink = async ({ id, data }: { id: string; data: Partial<CreateMeetingLinkData> }): Promise<MeetingLink> => {
  const response = await apiClient.put(`/meeting-links/${id}`, data);
  if (response.data.success) {
    return response.data.data;
  }
  throw new Error('Failed to update meeting link');
};

const deleteMeetingLink = async (id: string): Promise<void> => {
  const response = await apiClient.delete(`/meeting-links/${id}`);
  if (!response.data.success) {
    throw new Error('Failed to delete meeting link');
  }
};

export default function AdminMeetingLinksPage() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
    isActive: true
  });

  const queryClient = useQueryClient();

  const { data: meetingLinks, isLoading, error } = useQuery({
    queryKey: ['meetingLinks'],
    queryFn: fetchMeetingLinks,
  });

  const createMutation = useMutation({
    mutationFn: createMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link created successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
      setIsCreating(false);
      setFormData({ title: '', link: '', description: '', isActive: true });
    },
    onError: (error: Error) => {
      toast.error(`Failed to create meeting link: ${error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link updated successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
      setIsEditing(null);
    },
    onError: (error: Error) => {
      toast.error(`Failed to update meeting link: ${error.message}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMeetingLink,
    onSuccess: () => {
      toast.success('Meeting link deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['meetingLinks'] });
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete meeting link: ${error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      createMutation.mutate({
        title: formData.title,
        link: formData.link,
        description: formData.description || undefined,
        isActive: formData.isActive
      });
    } else if (isEditing) {
      updateMutation.mutate({
        id: isEditing,
        data: {
          title: formData.title,
          link: formData.link,
          description: formData.description || undefined,
          isActive: formData.isActive
        }
      });
    }
  };

  const startEditing = (link: MeetingLink) => {
    setIsEditing(link._id);
    setFormData({
      title: link.title || '',
      link: link.link,
      description: link.description || '',
      isActive: link.isActive
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/50 text-destructive rounded-lg p-4">
        <p>Error loading meeting links: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meeting Links Management</h1>
        <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Link
        </Button>
      </div>

      {(isCreating || isEditing) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Meeting Link' : 'Edit Meeting Link'}</CardTitle>
            <CardDescription>
              Configure meeting links for different courses and events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Course ₹299 Workshop"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="link">Meeting URL</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://meet.google.com/your-meeting-link"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Additional details about this meeting link"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending || updateMutation.isPending}
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isCreating ? 'Create Link' : 'Update Link'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(null);
                    setFormData({ title: '', link: '', description: '', isActive: true });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Meeting Links</CardTitle>
          <CardDescription>Manage meeting links for different courses and events.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Meeting URL</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meetingLinks && meetingLinks.length > 0 ? (
                  meetingLinks.map((link) => (
                    <TableRow key={link._id}>
                      <TableCell className="font-medium">{link.title}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        <a 
                          href={link.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {link.link}
                        </a>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          link.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {link.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => startEditing(link)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(link._id)}
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No meeting links found. Create your first one!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
