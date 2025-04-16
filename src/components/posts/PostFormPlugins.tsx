
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface Plugin {
  id: string;
  name: string;
  description: string;
}

interface PostFormPluginsProps {
  plugins: Plugin[];
  enabledPlugins: string[];
  togglePlugin: (pluginId: string) => void;
}

export default function PostFormPlugins({ 
  plugins, 
  enabledPlugins, 
  togglePlugin 
}: PostFormPluginsProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Available Plugins</h3>
        <Button variant="outline" size="sm">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Plugin
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {plugins.map((plugin) => (
          <Card key={plugin.id} className={`border ${enabledPlugins.includes(plugin.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{plugin.name}</CardTitle>
                <Button 
                  variant={enabledPlugins.includes(plugin.id) ? "default" : "outline"} 
                  size="sm"
                  onClick={() => togglePlugin(plugin.id)}
                >
                  {enabledPlugins.includes(plugin.id) ? "Enabled" : "Enable"}
                </Button>
              </div>
              <CardDescription>{plugin.description}</CardDescription>
            </CardHeader>
            {enabledPlugins.includes(plugin.id) && (
              <CardContent>
                <div className="bg-white p-3 rounded border text-sm">
                  Plugin settings will appear here
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
