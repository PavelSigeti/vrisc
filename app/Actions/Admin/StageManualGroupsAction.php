<?php

namespace App\Actions\Admin;

use App\Models\Race;
use App\Models\Stage;
use Illuminate\Support\Facades\DB;

class StageManualGroupsAction
{
    public function __invoke($stage, $groups)
    {
            $users = $stage->users()->get();
            
            $groupedUsers = [];
            foreach ($groups as $userId => $groupNumber) {
                $groupedUsers[$groupNumber][] = $userId;
            }
            
            $groupAmount = count($groupedUsers);
            
            if ($groupAmount > 1) {
                $races = [];
                
                foreach ($groupedUsers as $groupNumber => $userIds) {
                    $race = Race::create([
                        'status' => 'group',
                        'stage_id' => $stage->id,
                        'group_id' => $groupNumber,
                    ]);
                    
                    $race->users()->attach($userIds);
                    
                    $races[] = $race;
                }
                
                $stage->update([
                    'status' => 'group',
                ]);
                
                return response()->json([
                    'result' => true,
                    'status' => 'group',
                    'message' => 'Группы успешно сформированы',
                    'groups_count' => $groupAmount,
                    'users_per_group' => array_map('count', $groupedUsers),
                ]);
                
            } else {
                $userIds = reset($groupedUsers);
                $groupNumber = key($groupedUsers);

                if (Race::where('stage_id', $stage->id)->count() === 0) {
                    $race = Race::create([
                        'stage_id' => $stage->id,
                        'status' => 'default',
                        'group_id' => $groupNumber,
                    ]);
                    
                    $race->users()->attach($userIds);
                    
                    $stage->update([
                        'status' => 'default',
                    ]);
                    
                    return response()->json([
                        'result' => true,
                        'status' => 'default',
                        'message' => 'Гонка успешно создана',
                        'users_count' => count($userIds),
                    ]);
                }
                
                throw new \Exception('Гонка уже создана');
            }

    }
}