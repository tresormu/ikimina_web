import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import {
  Users,
  Calendar,
  GripVertical,
  Save,
  RotateCcw,
  Plus,
  Search,
  Clock,
  CheckCircle,
  AlertTriangle,
  History,
  Download,
} from 'lucide-react';

interface RotationMember {
  id: string;
  name: string;
  phone: string;
  position: number;
  isRecipient: boolean;
  hasReceived: boolean;
  skipReason?: string;
}

interface RotationLog {
  id: string;
  action: string;
  description: string;
  actorName: string;
  timestamp: string;
}

const RotationManagement: React.FC = () => {
  const [selectedCycle, setSelectedCycle] = useState(3);
  const [rotationMembers, setRotationMembers] = useState<RotationMember[]>([
    { id: '1', name: 'John Doe', phone: '+250712345678', position: 1, isRecipient: false, hasReceived: true },
    { id: '2', name: 'Jane Smith', phone: '+250723456789', position: 2, isRecipient: false, hasReceived: true },
    { id: '3', name: 'Bob Wilson', phone: '+250734567890', position: 3, isRecipient: false, hasReceived: true },
    { id: '4', name: 'Alice Mugisha', phone: '+250788123456', position: 4, isRecipient: true, hasReceived: false },
    { id: '5', name: 'David Brown', phone: '+250745678901', position: 5, isRecipient: false, hasReceived: true },
    { id: '6', name: 'Sarah Johnson', phone: '+250756789012', position: 6, isRecipient: false, hasReceived: true },
    { id: '7', name: 'Mike Davis', phone: '+250767890123', position: 7, isRecipient: false, hasReceived: true },
    { id: '8', name: 'Emma Wilson', phone: '+250778901234', position: 8, isRecipient: false, hasReceived: true, skipReason: 'Member on leave' },
  ]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverItem, setDragOverItem] = useState<number | null>(null);
  const [showAddCycle, setShowAddCycle] = useState(false);
  const [newCycleName, setNewCycleName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(8);

  const cycles = [1, 2, 3, 4];
  const weeksInCycle = 12;

  const rotationLogs: RotationLog[] = [
    {
      id: '1',
      action: 'reorder',
      description: 'Reordered rotation: Moved Alice Mugisha from position 4 to position 2',
      actorName: 'John Treasurer',
      timestamp: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      action: 'skip',
      description: 'Marked Emma Wilson as skipped for week 8 - Member on leave',
      actorName: 'John Treasurer',
      timestamp: '2024-01-19T15:45:00Z',
    },
    {
      id: '3',
      action: 'create',
      description: 'Created new rotation order for Cycle 4',
      actorName: 'John Treasurer',
      timestamp: '2024-01-18T09:20:00Z',
    },
  ];

  const filteredMembers = rotationMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const handleDragStart = (e: React.DragEvent, position: number) => {
    setDraggedItem(position);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault();
    setDragOverItem(position);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, dropPosition: number) => {
    e.preventDefault();
    setDragOverItem(null);
    
    if (draggedItem !== null && draggedItem !== dropPosition) {
      const newRotation = [...rotationMembers];
      const draggedMember = newRotation.find(m => m.position === draggedItem);
      
      if (draggedMember) {
        // Remove from original position
        newRotation.splice(newRotation.findIndex(m => m.position === draggedItem), 1);
        
        // Insert at new position
        const insertIndex = newRotation.findIndex(m => m.position === dropPosition);
        newRotation.splice(insertIndex, 0, draggedMember);
        
        // Update positions
        newRotation.forEach((member, index) => {
          member.position = index + 1;
        });
        
        setRotationMembers(newRotation);
        
        // Log the change
        console.log(`Rotation changed: Moved ${draggedMember.name} from position ${draggedItem} to position ${dropPosition + 1}`);
      }
    }
    
    setDraggedItem(null);
  };

  const handleSkipMember = (position: number) => {
    const member = rotationMembers.find(m => m.position === position);
    if (member) {
      const updatedMembers = rotationMembers.map(m =>
        m.position === position
          ? { ...m, skipReason: 'Manually skipped by treasurer' }
          : m
      );
      setRotationMembers(updatedMembers);
    }
  };

  const handleUnskipMember = (position: number) => {
    const member = rotationMembers.find(m => m.position === position);
    if (member) {
      const updatedMembers = rotationMembers.map(m =>
        m.position === position
          ? { ...m, skipReason: undefined }
          : m
      );
      setRotationMembers(updatedMembers);
    }
  };

  const handleSaveRotation = () => {
    // TODO: API call to save rotation
    console.log('Saving rotation:', rotationMembers);
    // Add to rotation logs
  };

  const handleAddCycle = () => {
    if (newCycleName.trim()) {
      // TODO: API call to create new cycle
      console.log('Creating new cycle:', newCycleName);
      setShowAddCycle(false);
      setNewCycleName('');
    }
  };

  const handleExportRotation = () => {
    // TODO: Export rotation as spreadsheet
    console.log('Exporting rotation...');
  };

  const getRecipientBadge = (member: RotationMember) => {
    if (member.skipReason) {
      return <Badge variant="error">Skipped</Badge>;
    }
    if (member.isRecipient) {
      return <Badge variant="success">This Week</Badge>;
    }
    if (member.hasReceived) {
      return <Badge variant="secondary">Received</Badge>;
    }
    return <Badge variant="default">Upcoming</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rotation Management</h1>
          <p className="text-gray-600 mt-2">Manage payout rotation order and track recipient schedule</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportRotation}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => setShowAddCycle(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Cycle
          </Button>
        </div>
      </div>

      {/* Cycle and Week Selection */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cycle</label>
              <select
                value={selectedCycle}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCycle(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {cycles.map(cycle => (
                  <option key={cycle} value={cycle}>Cycle {cycle}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Week</label>
              <select
                value={selectedWeek}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedWeek(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Array.from({ length: weeksInCycle }, (_, i) => i + 1).map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Members</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rotation List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Rotation Order - Cycle {selectedCycle}
              </span>
              <Button variant="outline" size="sm" onClick={handleSaveRotation}>
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            </CardTitle>
            <CardDescription>
              Drag and drop to reorder. Current recipient is highlighted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredMembers.map((member, index) => (
                <div
                  key={member.id}
                  className={`
                    relative border rounded-lg p-4 transition-all
                    ${member.isRecipient ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white'}
                    ${dragOverItem === member.position ? 'border-primary-400 bg-primary-100' : ''}
                    ${draggedItem === member.position ? 'opacity-50' : ''}
                    hover:shadow-md
                  `}
                  draggable
                  onDragStart={(e) => handleDragStart(e, member.position)}
                  onDragOver={(e) => handleDragOver(e, member.position)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, member.position)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <div>
                        <div className="font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.phone}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">#{member.position}</span>
                      {getRecipientBadge(member)}
                    </div>
                  </div>
                  
                  {member.skipReason && (
                    <div className="mt-2 text-sm text-red-600">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      {member.skipReason}
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 flex space-x-1">
                    {member.skipReason ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUnskipMember(member.position)}
                        title="Unskip member"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSkipMember(member.position)}
                        title="Skip member for this week"
                      >
                        <Clock className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No members found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Rotation Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="h-5 w-5 mr-2" />
              Recent Changes
            </CardTitle>
            <CardDescription>
              Audit log of all rotation modifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {rotationLogs.map((log) => (
                <div key={log.id} className="border-l-2 border-gray-200 pl-4 pb-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {log.action === 'reorder' && <RotateCcw className="h-4 w-4 text-blue-500" />}
                      {log.action === 'skip' && <Clock className="h-4 w-4 text-yellow-500" />}
                      {log.action === 'create' && <Plus className="h-4 w-4 text-green-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-900">{log.description}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-gray-500">by {log.actorName}</span>
                        <span className="text-xs text-gray-400">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Cycle Modal */}
      {showAddCycle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New Cycle</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddCycle(false)}
              >
                ×
              </Button>
            </div>
            
            <div className="space-y-4">
              <Input
                label="Cycle Name"
                placeholder="e.g., Cycle 4 - Q1 2024"
                value={newCycleName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCycleName(e.target.value)}
              />
              
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">What will be created:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>New rotation order based on current cycle</li>
                  <li>All members included in initial positions</li>
                  <li>No recipient assigned for week 1</li>
                  <li>Change logged in audit trail</li>
                </ul>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddCycle(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddCycle}>
                  Create Cycle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RotationManagement;
