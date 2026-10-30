<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use Illuminate\Http\Request;

class TripController extends Controller
{
    // GET trips filtered by the user_id query parameter
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $trips = Trip::where('user_id', $userId)->get();

        return response()->json($trips, 200);
    }

    // POST / store trip safely using the request payload id
    public function store(Request $request)
    {
        $data = $request->all();

        // Check if the frontend supplied the user_id inside the JSON body
        if (!isset($data['user_id'])) {
            return response()->json(['message' => 'Missing user_id parameter'], 400);
        }

        if (isset($data['vibes']) && is_array($data['vibes'])) {
            $data['vibes'] = json_encode($data['vibes']);
        }

        if (isset($data['activities']) && is_array($data['activities'])) {
            $data['activities'] = json_encode($data['activities']);
        }

        $trip = Trip::create($data);

        return response()->json($trip, 201);
    }
}