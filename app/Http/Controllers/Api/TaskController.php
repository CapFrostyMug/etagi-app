<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\Priority;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Task $task
     * @return AnonymousResourceCollection
     */
    public function index(Task $task)
    {
        return TaskResource::collection($task->query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        /**/
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Task $task
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Task $task)
    {
        $data = $task->create([
            'title' => $request->title,
            'description' => $request->description,
            'priority_id' => $request->priority['id'],
            'status_id' => $request->status['id'],
            'executor' => $request->executor['id'],
            'creator' => $request->user()->id,
            'date_end' => $request->date_end,
        ]);

        return response(new TaskResource($data), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        /**/
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Task $todo_list)
    {
        $data = $todo_list->update([
            'title' => $request->title,
            'description' => $request->description,
            'priority_id' => $request->priority['id'],
            'status_id' => $request->status['id'],
            'executor' => $request->executor['id'],
            'creator' => $request->user()->id,
            'date_end' => $request->date_end,
        ]);

        return response(new TaskResource($data), 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getExtraData(Priority $priority, Status $status, User $user)
    {
        return response([
            'priorities' => $priority->all(),
            'statuses' => $status->all(),
            'executors' => $user->where('is_admin', 0)->get(),
        ]);
    }
}
