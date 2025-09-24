import React, { useState } from 'react';
import { X, Edit, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';

interface CreateWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateWorkspace: React.FC<CreateWorkspaceProps> = ({ isOpen, onClose }) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCreate = () => {
    // Handle workspace creation logic here
    console.log('Creating workspace:', { workspaceName, description, isPrivate });
    onClose();
  };

  const handleCancel = () => {
    setWorkspaceName('');
    setDescription('');
    setIsPrivate(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="bg-white h-24 border-b border-[rgba(103,144,155,0.16)] rounded-t-3xl">
        <button 
          onClick={onClose}
          className="absolute right-8 top-8 w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="flex items-center gap-4 px-8 py-6">
          <div className="w-12 h-12 bg-[#67909b] rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-medium text-[#252525]">Create a new workspace</h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Description */}
        <p className="text-[#666666] text-base mb-8 leading-6">
          Create and manage workspaces to centralize your team's collaboration, resources, and project tracking in one place.
        </p>

        {/* Form */}
        <div className="space-y-8">
          {/* Workspace Name */}
          <div className="space-y-4">
            <label className="text-[#252525] text-base font-medium capitalize">Workspace name</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 bg-[#67909b] rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-medium">
                    {workspaceName ? workspaceName[0].toUpperCase() : 'N'}
                  </span>
                </div>
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#67909b] rounded flex items-center justify-center hover:bg-[#5a7a85] transition-colors">
                  <Edit className="w-3 h-3 text-white" />
                </button>
              </div>
              <Input
                placeholder="Enter new workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="flex-1 h-15 border-[#dddddd] focus:border-[#67909b] focus:ring-[#67909b]"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <label className="text-[#252525] text-base font-medium capitalize">Description</label>
            <Textarea
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24 border-[#dddddd] focus:border-[#67909b] focus:ring-[#67909b] resize-none"
            />
          </div>

          {/* Make Private */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-[#252525] text-base font-medium">Make private</h3>
              <p className="text-[#999999] text-sm">Only you and invited members have access</p>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
              className="data-[state=checked]:bg-[#67909b]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-10 mt-12">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="w-36 h-10 border-[#67909b] text-[#67909b] hover:bg-[#67909b] hover:text-white transition-colors"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            className="w-36 h-10 bg-[#67909b] hover:bg-[#5a7a85] text-white transition-colors"
          >
            Create workspace
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;