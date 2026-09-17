import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { customers, chatSessions } from '../data/mock';
import { MessageSquare, Phone, User as UserIcon, Bot, Wrench, AlertTriangle, UserPlus } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { format } from 'date-fns';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export function AIMessages() {
  const [selectedSessionId, setSelectedSessionId] = useState(chatSessions[0].id);
  const session = chatSessions.find(s => s.id === selectedSessionId) || chatSessions[0];
  const customer = customers.find(c => c.id === session.customerId);

  const handleSendMessage = () => {
    toast.success('Message sent successfully (mock)');
  };

  const handleTakeControl = () => {
    toast.success('You have taken control of the conversation');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">WhatsApp / AI Conversations</h2>
        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
          WhatsApp Business API Connected
        </Badge>
      </div>

      <div className="flex-1 flex gap-4 h-full min-h-0">
        {/* Chat List */}
        <Card className="w-80 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-100">
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-slate-400 bg-gray-50"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {chatSessions.map(sess => {
              const cust = customers.find(c => c.id === sess.customerId);
              const lastMsg = sess.messages[sess.messages.length - 1];
              const isSelected = sess.id === selectedSessionId;
              
              return (
                <div 
                  key={sess.id} 
                  onClick={() => setSelectedSessionId(sess.id)}
                  className={cn(
                    "p-4 border-b border-gray-50 cursor-pointer transition-colors",
                    isSelected ? "bg-slate-100 border-l-2 border-l-slate-900" : "hover:bg-gray-50 bg-slate-50/30"
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-sm text-gray-900">{cust?.name}</span>
                    <span className="text-xs text-gray-400">{format(new Date(lastMsg.timestamp), 'HH:mm')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-500 truncate flex-1">{lastMsg.text}</p>
                    {sess.requiresHuman && (
                      <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="flex-1 flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-slate-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{customer?.name}</h3>
                <p className="text-xs text-gray-500">{customer?.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {session.requiresHuman ? (
                <Badge variant="destructive" className="bg-red-50 text-red-700 border-red-200">Human Takeover</Badge>
              ) : (
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">Auto-Pilot Active</Badge>
              )}
            </div>
          </div>

          {session.requiresHuman && (
             <div className="bg-red-50 border-b border-red-100 p-3 px-6 flex items-center justify-between text-sm text-red-800 z-10">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <strong>Attention Needed:</strong> AI handed over this conversation.
                </div>
                <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-700 hover:bg-red-100" onClick={handleTakeControl}>
                  <UserPlus className="w-4 h-4 mr-2" /> Take Control
                </Button>
             </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {session.messages.map(msg => {
              const isAi = msg.sender === 'ai';
              const isTool = msg.toolCall;
              
              if (isTool) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 font-mono shadow-sm border border-slate-200">
                      <Wrench className="w-3 h-3" />
                      {msg.toolCall}
                    </div>
                  </div>
                )
              }

              if (msg.text.startsWith('[System: Intent outside')) {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="bg-red-100 text-red-700 text-xs px-4 py-2 rounded-full flex items-center gap-2 font-medium shadow-sm border border-red-200">
                      <AlertTriangle className="w-4 h-4" />
                      AI triggered human handoff
                    </div>
                  </div>
                );
              }

              if (msg.text.startsWith('[System:')) return null;

              return (
                <div key={msg.id} className={cn("flex w-full", isAi ? "justify-start" : "justify-end")}>
                  <div className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-2 shadow-sm text-sm whitespace-pre-wrap",
                    isAi ? "bg-white border border-gray-100 text-gray-800 rounded-tl-sm" : "bg-emerald-600 text-white rounded-tr-sm"
                  )}>
                    {isAi && (
                      <div className="flex items-center gap-1 mb-1 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                        <Bot className="w-3 h-3" /> AI Assistant
                      </div>
                    )}
                    {msg.text}
                    <div className={cn("text-[10px] mt-1 text-right opacity-70", isAi ? "text-gray-400" : "text-emerald-100")}>
                      {format(new Date(msg.timestamp), 'HH:mm')}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="p-4 bg-white border-t border-gray-100 rounded-b-xl z-10">
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder={session.requiresHuman ? "Type your reply as a human agent..." : "Type a message to override AI..."} 
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full text-sm outline-none focus:border-slate-400"
                onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage() }}
              />
              <button 
                onClick={handleSendMessage}
                className={cn(
                  "p-2 text-white rounded-full transition-colors",
                  session.requiresHuman ? "bg-red-600 hover:bg-red-700" : "bg-slate-900 hover:bg-slate-800"
                )}>
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

